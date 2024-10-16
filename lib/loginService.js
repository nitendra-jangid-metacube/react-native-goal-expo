import { instance as api }  from './API';

class LoginService {
  login(data) {
    return api
      .post('api/user/login', data)
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }
  // Delete uesr token info when logout from app
  userLogoutAPI = async () => {
    return api
      .get('api/user/logout')
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }
  getMe = async () => {
    try {
      const response = await api.get('api/user');
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  getVendor = async () => {
    try {
      const response = await api.get('api/vendor/list');
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
}
export default new LoginService();

