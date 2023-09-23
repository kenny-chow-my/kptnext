import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta';
import { AccountLayout } from '@/layouts/index';

import { Button } from 'antd';

const Settings = ({ user }) => {
  return (
    <AccountLayout>
      <Meta title="Coming soon" />
      <Content.Title
        title="Oops, we're not quite ready yet."
        subtitle="We're still working on our app. Let us know if you NEED this right away!"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <div className="w-full p-10 space-y-5">
            <Button type="primary" href="/support">
              <span>Contact us</span>
            </Button>
          </div>
        </Card>
      </Content.Container>
    </AccountLayout>
  );
};

export default Settings;
