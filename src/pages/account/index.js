import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { useSession } from 'next-auth/react';
import { Radio, Select, Card, Button, Input, Form } from 'antd';


const Welcome = () => {
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);
  const [translationStyle, setTranslationStyle] = useState(1);
  const [languagePair, setLanguagePair] = useState(1);

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

  const changeName = (evt) => {
    evt.preventDefault();
    console.log(evt);
    console.log(session);
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
        <Input.TextArea />
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
                onClick={changeName}
                type="primary"
              >
                Translate
              </Button>
            </Form>
        </Card>
       </Content.Container>
    </AccountLayout>
  );
};

export default Welcome;
