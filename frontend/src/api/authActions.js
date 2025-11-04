// authActions.js
export const logoutUser = () => async (dispatch) => {
  try {
    // Call backend logout to clear HTTP-only cookie
    await axios.post('/auth/logout', {}, { 
      withCredentials: true 
    });
  } catch (error) {
    console.log('Logout API call failed, but continuing with frontend logout');
  } finally {
    // Always clear frontend state
    dispatch({
      type: 'auth/logout'
    });
    
    // Clear any local storage
    localStorage.removeItem('persist:root');
    
    // Redirect to login page
    window.location.href = '/login';
  }
};