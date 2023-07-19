import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { useSession } from 'next-auth/react';
import { Radio, Select, Card, Button, Input, Form } from 'antd';

import api from '@/lib/common/api';

const Welcome = () => {
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);
  const [translationStyle, setTranslationStyle] = useState(1);
  const [languagePair, setLanguagePair] = useState(1);
  const [sourceText, setSourceText] = useState("");

  const [translatedText, setTranslatedText] = useState("");

  const session = useSession();

  const formRef = useRef(null);

  const onChangeTranslationStyle = (e) => {
    console.log('radio checked', e.target.value);
    setTranslationStyle(e.target.value);
  };

  const onChangeLanguagePair = (e) => {
    console.log('radio checked', e.target.value);
    setLanguagePair(e.target.value);
  };


  const handleSourceTextChange = (event) => setSourceText(event.target.value);

  const doTranslate = (evt) => {
    evt.preventDefault();
    console.log(evt);
    console.log(session);

    const request = {
      languagePairId: "6d65c38b-5a1a-425e-b732-ac39d1bf2a2d",
      sourceText: sourceText
    };

    
    setSubmittingState(true);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/translate/';

    api(url, {
      body: request,
      method: 'POST',
    }).then((response) => {
      setSubmittingState(false);

      if (response.errors) {
        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        toast.success('Translation done!');
        console.log(response);
        setTranslatedText(response.translatedText);
      }
    }).catch((err) =>{
        setSubmittingState(false);
        toast.error('There was an error!');
        console.log(err);
    });
  }


  const languages = [
        { value: 'zh', label: 'Chinese' },
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'id', label: 'Bahasa Indonesia' },
      ];

  return (
    <AccountLayout>
      <Meta title="Translate" />
      <Content.Title
        title="Translator"
        subtitle="Create your own personal translator"
      />
      <Content.Divider />
      <Content.Container>
         <Card title="Translate your text">
            <Form ref={formRef}>

      <Form.Item
        name="sourceText"
        label="Translate this"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea value={sourceText}
                        disabled={isSubmitting}
                        onChange={handleSourceTextChange}
        />
      </Form.Item>

        <Form.Item
        name="translationStyle"
        label="Style"
        rules={[
          {
            required: true,
          },
        ]}
      >      
            <Radio.Group onChange={onChangeTranslationStyle} value={translationStyle}>
              <Radio value={"1"}>Neutral</Radio>
              <Radio value={"2"}>Casual</Radio>
              <Radio value={"3"}>Business Formal</Radio>
            </Radio.Group>
       </Form.Item>     


        <Form.Item
            name="languagePair"
            rules={[
              {
                required: true,
              },
            ]}
          >
 
            From:
            <Select defaultValue="en" 
              options = {languages}
            />


            To:
            <Select defaultValue="id" 
              options = {languages}
            />
           </Form.Item>     
              <Button
                disabled={isSubmitting}
                onClick={doTranslate}
                type="primary"
              >
                Translate
              </Button>
            </Form>
          </Card>
          <Card title="Result">
          <Form.Item>
              <Input.TextArea value={translatedText}
                            disabled={isSubmitting}
            />
          </Form.Item>

        </Card>
       </Content.Container>
    </AccountLayout>
  );
};

export default Welcome;
