import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { nicknameSchema } from '@/schemas';

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export const NameInput = ({ value, onChange, placeholder, onValidationChange }: NameInputProps) => {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // 빈 값 체크
    if (value.trim() === '') {
      setIsValid(false);
      setErrorMessage('');
      onValidationChange?.(false);
      return;
    }

    // Zod 스키마로 검증 (길이, 문자 제한, 비속어 체크 모두 포함)
    const schemaResult = nicknameSchema.safeParse(value);

    if (!schemaResult.success) {
      // 검증 실패 시 첫 번째 에러 메시지 표시
      const firstError = schemaResult.error.issues[0];
      setIsValid(false);
      setErrorMessage(firstError.message);
      onValidationChange?.(false);
      return;
    }

    // 모든 검증 통과
    setIsValid(true);
    setErrorMessage('');
    onValidationChange?.(true);
  }, [value, onValidationChange]);

  return (
    <InputContainer>
      <Container
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        $isValid={isValid}
        aria-label="닉네임 입력"
        aria-invalid={!isValid}
        aria-describedby={!isValid ? 'name-error' : undefined}
      />
      <ErrorMessageContainer>
        {!isValid && errorMessage && (
          <ErrorMessage id="name-error" role="alert" aria-live="polite">
            {errorMessage}
          </ErrorMessage>
        )}
      </ErrorMessageContainer>
    </InputContainer>
  );
};

export default NameInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.input<{ $isValid: boolean }>`
  width: 272px;
  height: 50px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ $isValid, theme }) => ($isValid ? theme.colors.secondary : '#ff4444')};
  border-radius: 50px;
  font: ${({ theme }) => theme.font.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 53px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
  &:focus {
    outline: none;
    border: 2px solid ${({ $isValid, theme }) => ($isValid ? theme.colors.secondary : '#ff4444')};
  }
`;

const ErrorMessageContainer = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 12px;
  text-align: center;
`;
