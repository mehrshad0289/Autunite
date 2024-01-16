const jwtServiceConfig = {
  signIn: `api/login`,
  resetPassword: `api/reset-password`,
  forgotPassword: `api/forgot-password`,
  signUp: 'api/register',
  accessToken: 'realms/UMS/protocol/openid-connect/userinfo',
  userInfo: 'api/user-info',
  setFundPassword: 'api/set-fund-password',
  withdraw: 'api/withdraw',
  deletePendingWithdraw: 'api/withdraw/delete-pending',
  myWithdraws: 'api/my-withdraw-list',
  myDeposits: 'api/my-deposits',
  userDepositLogs: 'api/deposit-logs',
  confirmEmail: 'api/confirm-email',
  sendRegisterConfirmation: 'api/register-confirmation',
  changePassword: 'api/change-password',
  saveTicket: 'api/save-ticket',
  saveTicketResponse: 'api/ticket/response',
  sendConfirmation: 'api/send-confirmation',
  getUsersTreeNodes: 'api/tree-users',
  getParentsOfUser: 'api/get-user-parents',
  setTwoFactorAuth: 'api/set-two-factor-auth',
  getTwoFactorAuth: 'api/get-two-factor-auth',
  updateUser: 'api/auth/user/update',
};

export default jwtServiceConfig;
