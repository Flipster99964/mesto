export default class UserInfo {
    constructor({ username, job }) {
      this._username = document.querySelector(username);
      this._job = document.querySelector(username);
    }
  
    getUserInfo() {
      const userInfo = {
        username: this._username.textContent,
        job: this._job.textContent
      }
  
      return userInfo;
    }
  
    setUserInfo(userdata) {
      this._username.textContent = userdata.username;
      this._job.textContent = userdata.job;
    }
  }