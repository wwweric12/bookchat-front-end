import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { AxiosSignup } from '../../../api/AxiosSignup.js';
import Input from '../../component/Input.jsx';
import LargeButton from '../../component/LargeButton.jsx';

import { validation } from './Validation.jsx';

const Signup = () => {
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
    alert(`${data.data.message}`);
    navigate('/login');
  };

  const onSubmit = (data) => {
    AxiosSignup(data, callbackFunction);
  };

  return (
    <SignupConatiner>
      <SignupTitle>회원가입</SignupTitle>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input title="닉네임" placeholder="닉네임을 입력해주세요" register={register} inputId="userName" />
          {errors.userName && <SignupError>{errors.userName.message}</SignupError>}
          <Input
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            register={register}
            inputId="password"
          />
          {errors.password && <SignupError>{errors.password.message}</SignupError>}
          <Input title="이메일" placeholder="이메일을 입력해주세요" type="email" register={register} inputId="email" />
          {errors.email && <SignupError>{errors.email.message}</SignupError>}
        </InputContainer>
        <LargeButton text="완료하기" />
      </SignupForm>
    </SignupConatiner>
  );
};

export default Signup;

const SignupConatiner = styled.div`
  width: 540px;
  height: 606px;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupTitle = styled.div`
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

const SignupForm = styled.form`
  width: 100%;
`;

const SignupError = styled.div`
  width: 100%;
  color: #ea533c;
  font-size: 10px;
`;
