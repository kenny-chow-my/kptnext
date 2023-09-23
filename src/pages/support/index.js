import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta';
import { AccountLayout } from '@/layouts/index';
import { MailOutlined } from '@ant-design/icons';

import { Button } from 'antd';

const Settings = ({ user }) => {
  return (
    <AccountLayout>
      <Meta title="Support" />
      <Content.Title title="Support" />

      <Content.Divider />
      <Content.Container>
        Feeling lost? <br />
        Need help? <br />
        Or have some ideas to share with us? <br />
        <div className="w-full p-10 space-y-5">
          Contact us at:
          <br />
          <Button
            type="primary"
            shape="round"
            icon={<MailOutlined size="large" />}
            href="mailto:support@lingui.me"
          >
            <span>support@lingui.me</span>
          </Button>
        </div>
      </Content.Container>
    </AccountLayout>
  );
};

export default Settings;
