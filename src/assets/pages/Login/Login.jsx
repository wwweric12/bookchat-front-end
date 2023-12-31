import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { AxiosSignin } from '../../../api/AxiosSignin.js';
import Input from '../../component/Input.jsx';
import LargeButton from '../../component/LargeButton.jsx';

import { validation } from './Validation.jsx';

const Login = ({ setIsLoggined }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const callbackFunction = (data) => {
    alert(data.message);
    localStorage.setItem('accessToken', data.data.accessToken);
    navigate('/');
    setIsLoggined(true);
  };

  const onSubmit = (data) => {
    AxiosSignin(data, callbackFunction);
  };

  return (
    <LoginConatiner>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input title="이메일" placeholder="이메일을 입력해주세요" register={register} inputId="email" />
          {errors.email && <LoginError>{errors.email.message}</LoginError>}
          <Input
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            register={register}
            inputId="password"
          />
          {errors.password && <LoginError>{errors.password.message}</LoginError>}
        </InputContainer>
        <LargeButton text="로그인" />
      </LoginForm>
      <SignupLink to="/signup">회원이 아니신가요? 회원가입하러가기</SignupLink>
    </LoginConatiner>
  );
};

export default Login;

const LoginConatiner = styled.div`
  width: 540px;
  height: 606px;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.div`
  width: 380px;
  height: 125px;
  font-size: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.BROWN100};
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;

const LoginForm = styled.form`
  width: 100%;
`;

const LoginError = styled.div`
  width: 100%;
  color: #ea533c;
  font-size: 10px;
`;

const SignupLink = styled(Link)`
  width: 100%;
  height: 35px;
  font-size: 15px;
  display: flex;
  justify-content: end;
  align-items: center;
  color: ${({ theme }) => theme.colors.MINT100};
`;
