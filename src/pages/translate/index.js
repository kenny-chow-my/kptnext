import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { useSession } from 'next-auth/react';
import { Radio, Select, Card, Button, Input, Form } from 'antd';

import api from '@/lib/common/api';

const Translate = () => {
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);
  const [translationStyle, setTranslationStyle] = useState('casual');
  const [languagePair, setLanguagePair] = useState(
    '6d65c38b-5a1a-425e-b732-ac39d1bf2a2d'
  );
  const [sourceText, setSourceText] = useState('');
  const [personas, setPersonas] = useState([
    { name: 'default', prompt: 'default' },
  ]);
  const [languages, setLanguages] = useState([
    {
      value: '6d65c38b-5a1a-425e-b732-ac39d1bf2a2d',
      sourceLanguage: 'en',
      targetLanguage: 'zh',
      label: 'English to Chinese',
    },
  ]);
  const [translatedText, setTranslatedText] = useState('');

  const session = useSession({ required: true });

  const idToken = session.data?.user?.idToken || '';

  const formRef = useRef(null);

  const onChangeTranslationStyle = (e) => {
    console.log('radio checked', e.target.value);
    setTranslationStyle(e.target.value);
  };

  const onChangeLanguagePair = (e) => {
    console.log('changed languaged', e);
    setLanguagePair(e);
  };

  useEffect(() => {
    const personasUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL + '/config/personas';

    api(personasUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (response.error) {
          toast.error(response.error);
        } else {
          console.log(response);
          setPersonas(response.data);
        }
      })
      .catch((err) => {
        toast.error('There was an error!');
        console.log(err);
      });

    const languagesUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL + '/config/languages';

    api(languagesUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (response.error) {
          toast.error(response.error);
        } else {
          console.log(response);
          const languages = response.data.map(({ id, ...rest }) => ({
            value: id,
            ...rest,
          }));
          setLanguages(languages);
          console.log(languages);
        }
      })
      .catch((err) => {
        toast.error('There was an error!');
        console.log(err);
      });
  }, []);

  const handleSourceTextChange = (event) => setSourceText(event.target.value);

  const doTranslate = (evt) => {
    evt.preventDefault();
    console.log(evt);
    console.log(session);

    const request = {
      languagePairId: languagePair || 0,
      sourceText: sourceText,
      persona: translationStyle,
    };

    setSubmittingState(true);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/translate/';

    api(url, {
      body: request,
      headers: {
        Authorization: 'Bearer ' + idToken,
      },
      method: 'POST',
    })
      .then((response) => {
        setSubmittingState(false);

        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success('Translation done!');
          console.log(response);
          setTranslatedText(response.data.translatedText);
        }
      })
      .catch((err) => {
        setSubmittingState(false);
        toast.error('There was an error!');
        console.log(err);
      });
  };

  return (
    <AccountLayout>
      <Meta title="Translate" />
      <Content.Title
        title="What would you like to translate today?"
        subtitle=""
      />
      <Content.Divider />

      <Content.Container>
        <Card>
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
              <Input.TextArea
                value={sourceText}
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
              <Radio.Group
                onChange={onChangeTranslationStyle}
                value={translationStyle}
              >
                {personas.map((persona) => (
                  <Radio key={persona.name} value={persona.prompt}>
                    {persona.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="languagePairSelect"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              Language:
              <Select
                defaultValue="6d65c38b-5a1a-425e-b732-ac39d1bf2a2d"
                options={languages}
                onChange={onChangeLanguagePair}
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
            <Input.TextArea value={translatedText} disabled={isSubmitting} />
          </Form.Item>
        </Card>
      </Content.Container>
    </AccountLayout>
  );
};

export default Translate;
Translate.auth = true;
