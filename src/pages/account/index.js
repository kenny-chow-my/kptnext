import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { signOut, useSession } from 'next-auth/react';

const Welcome = () => {
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);

  const session = useSession();


  const changeName = (evt) => {
    evt.preventDefault();
    console.log(evt);
    console.log(session);
  }

  return (
    <AccountLayout>
      <Meta title="Translate" />
      <Content.Title
        title="Translator"
        subtitle="Start building SaaS platforms in a day"
      />
      <Content.Divider />
      <Content.Container>
         <Card>
          <form>
            <Card.Body
              title="Test to translate"
              subtitle="Please enter the text to translate"
            >
              <input
                className="px-3 py-2 border rounded md:w-1/2"
                disabled={isSubmitting}
                type="text"
              />
            </Card.Body>
            <Card.Footer>
              <small>Please use 32 characters at maximum</small>
              <Button
                className="text-white bg-blue-600 hover:bg-blue-500"
                disabled={isSubmitting}
                onClick={changeName}
              >
                Translate
              </Button>
            </Card.Footer>
          </form>
        </Card>
       </Content.Container>
    </AccountLayout>
  );
};

export default Welcome;
