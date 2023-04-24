import axios from 'axios';
import vuex from '../store/index';
import { Message } from 'element-ui';
// �����
// ����Ŀ���������Ϊ get����
//����һ��request����������ӿڵ���Ӧ
export function request(url, params) {
  // ���󳬹�30�����ж�Ϊ��ʱ
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios������
  // ��������
  instance.interceptors.request.use(
    (config) => {
      // console.log('����������');
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  // ��Ӧ����
        //config��axios��Ӧ�������Żص�һ����Ӧ���ݶ���
        //config.data����Ӧ����
        //code����һ��״̬��
        //����ʹ��code���ж��Ƿ����2xx�ǳɹ�״̬��
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code !== 200 && !(code >= 800 && code <= 803))
        Message.error(config.data.message || 'δ֪����, ��򿪿���̨�鿴');
      return config;
    },
    (err) => {
      console.log([err]);
      if (err.response.data.msg === '��Ҫ��¼') {
        // cookie���� �˳���¼
        // console.log(window.localStorage.getItem("userInfo"));
        // window.localStorage.setItem("userInfo", "");
        // ˢ��ҳ��
        // history.go(0)
        // �޸ĵ�ǰ�ĵ�¼״̬
        vuex.state.isLogin = false;
      } else {
        // console.log(err.response.data.msg);
        Message.error(err.response.data.message || 'δ֪����, ��򿪿���̨�鿴');
      }
    },
  );

  //�Ƿ��������
  instance.defaults.withCredentials = true;

  if (params) {
    const query = { params };
    return instance.get(url, query);
  } else {
    return instance.get(url);
  }
}
