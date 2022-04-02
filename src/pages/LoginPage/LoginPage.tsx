import React from 'react';

import { Input } from '../../common/fields';
import { Button } from '../../common/buttons';

import './LoginPage.css';

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({ username: '', password: '' });

  return (
    <div className='login_page'>
      <div className='login_page_container'>
        <div>header</div>
        <div className='login_page_form_container'>
          <input type='text' style={{ width: '100%' }} />
          <div className='login_page_input_container'>
            <Input
              isError={true}
              helperText='validation'
              value={formValues.username}
              placeholder='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, username: event.target.value })
              }
            />
          </div>
          <div className='login_page_input_container'>
            <Input
              value={formValues.password}
              placeholder='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, password: event.target.value })
              }
            />
          </div>
          <div>
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
