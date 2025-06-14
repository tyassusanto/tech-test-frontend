import { useState } from 'react';
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DashboardOutlined, DatabaseOutlined, LeftOutlined, LogoutOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../app/features/authentication';
const { Header, Sider, Content } = Layout;
const BaseLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const items = [
    {
      icon: <LogoutOutlined />,
      label: 'Logout',
      key: 'logout',
    },
  ];
  const location = useLocation();

  const getSelectedKey = (pathname) => {
    if (pathname === '/') return '1';
    if (pathname.startsWith('/master-gate')) return '3';
    return '';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey(location.pathname)]}
          onClick={({ key }) => {
            if (key === '1') {
              navigate('/');
            } else if (key === '3') {
              navigate('/master-gate');
            }
          }}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <DatabaseOutlined />,
              label: 'Master Data Gerbang',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            <Button
              type="text"
              icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />

            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    handleLogout();
                  }
                },
              }}
              trigger={['click']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar>
                    <UserOutlined />
                  </Avatar>
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default BaseLayout;