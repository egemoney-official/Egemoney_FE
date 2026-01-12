# 코드 스타일 가이드

이 문서는 Gemini 코드 리뷰가 참고하는 프로젝트의 코딩 스타일 가이드입니다.

## 일반 원칙

- **타입 안정성**: TypeScript의 strict 모드를 준수하며, 모든 타입을 명시적으로 정의합니다.
- **일관성**: 프로젝트 전반에 걸쳐 일관된 코딩 스타일을 유지합니다.
- **가독성**: 코드는 읽기 쉽고 이해하기 쉬워야 합니다.
- **접근성**: 웹 접근성(accessibility)을 고려하여 개발합니다.

## 컴포넌트 작성 규칙

### 함수형 컴포넌트

- 모든 컴포넌트는 **화살표 함수(arrow function)**로 작성합니다.
- 컴포넌트 이름은 **PascalCase**를 사용합니다.

```typescript
// ✅ 올바른 예시
export const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  return <div>...</div>;
};

// ❌ 잘못된 예시
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return <div>...</div>;
}
```

### Props 타입 정의

- Props 타입은 `interface` 또는 `type`으로 명시적으로 정의합니다.
- Props 인터페이스 이름은 `{ComponentName}Props` 형식을 따릅니다.

```typescript
// ✅ 올바른 예시
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ label, onClick, disabled }: ButtonProps) => {
  // ...
};
```

### 컴포넌트 구조

1. **Import 문**: 외부 라이브러리 → 프로젝트 내부 모듈 순서
2. **타입 정의**: Props 인터페이스/타입
3. **컴포넌트**: 메인 컴포넌트
4. **Export**: 기본 export 또는 named export

## 경로 및 Import 규칙

### 절대 경로 사용

- **절대 경로(`@/`)**를 사용합니다. 상대 경로(`../`, `../../`)는 피합니다.

```typescript
// ✅ 올바른 예시
import { theme } from '@/styles/theme';
import { useQueryApi } from '@/Apis/useQueryApi';
import { Button } from '@/Shared/components/Button';

// ❌ 잘못된 예시
import { theme } from '../../../styles/theme';
import { useQueryApi } from '../../Apis/useQueryApi';
```

## 폴더 구조 규칙

- **페이지 컴포넌트**: `src/Pages/` 폴더에 생성
- **공통 컴포넌트**: `src/Shared/components/` 폴더에 생성
- **API 관련 코드**: `src/Apis/` 폴더에 생성
- **커스텀 훅**: `src/hooks/` 폴더에 생성
- **유틸리티 함수**: `src/utils/` 폴더에 생성
- **스타일 관련**: `src/styles/` 폴더에 생성

## API 호출 패턴

### React Query 사용

- 모든 API 호출은 **React Query**를 사용합니다.
- Query는 `useQueryApi` 훅을 사용합니다.
- Mutation은 `usePostApi`, `usePutApi`, `usePatchApi`, `useDeleteApi` 훅을 사용합니다.

```typescript
// ✅ Query 사용 예시
import { useQueryApi } from '@/Apis/useQueryApi';

const { data, isLoading, error } = useQueryApi<UserData>(['user'], '/api/user');

// ✅ Mutation 사용 예시
import { usePostApi } from '@/Apis/useMutationApi';

const { mutate, isPending } = usePostApi<ResponseType, RequestType>('/api/endpoint');
```

### 에러 처리

- API 에러는 React Query의 에러 핸들링 메커니즘을 활용합니다.
- 401 에러는 자동으로 토큰 갱신을 시도합니다.

## 스타일링 규칙

### Emotion 사용

- 스타일링은 **Emotion**의 `styled` 컴포넌트를 사용합니다.
- 인라인 스타일은 최소화합니다.

```typescript
// ✅ 올바른 예시
import styled from '@emotion/styled';

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
`;
```

### 테마 사용

- 색상, 폰트, 간격 등은 테마(`@/styles/theme`)에서 가져와 사용합니다.
- 하드코딩된 색상 값은 피합니다.

## 네이밍 규칙

- **컴포넌트**: PascalCase (`Button`, `UserProfile`)
- **함수/변수**: camelCase (`handleClick`, `userData`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)
- **타입/인터페이스**: PascalCase (`UserData`, `ApiResponse`)
- **파일명**:
  - 컴포넌트: PascalCase (`Button.tsx`, `UserProfile.tsx`)
  - 유틸리티/훅: camelCase (`useAuth.ts`, `formatDate.ts`)

## 접근성(Accessibility)

- 인터랙티브 요소에는 적절한 `aria-label` 또는 `aria-labelledby`를 추가합니다.
- 키보드 네비게이션을 지원합니다.
- 시맨틱 HTML 요소를 사용합니다 (`<button>`, `<nav>`, `<main>` 등).

```typescript
// ✅ 올바른 예시
<button onClick={handleClick} aria-label="닫기">
  <CloseIcon />
</button>
```

## 에러 처리

- 에러는 명확하고 사용자 친화적인 메시지로 표시합니다.
- 콘솔 로그는 개발 환경에서만 사용하고, 프로덕션에서는 제거합니다.

## 주석 및 문서화

- 복잡한 로직에는 주석을 추가합니다.
- 함수/컴포넌트의 목적과 사용법을 명확히 설명합니다.
- TODO 주석은 구체적인 작업 내용과 담당자를 명시합니다.

```typescript
// ✅ 좋은 주석 예시
/**
 * 사용자 인증 토큰을 갱신합니다.
 * 401 에러 발생 시 자동으로 호출됩니다.
 *
 * @param originalRequest - 원본 요청 설정
 * @returns 갱신된 토큰으로 재시도한 요청 결과
 */
const refreshToken = async (originalRequest: AxiosRequestConfig) => {
  // ...
};
```

## 성능 최적화

- 불필요한 리렌더링을 방지하기 위해 `React.memo`, `useMemo`, `useCallback`을 적절히 사용합니다.
- 큰 리스트는 가상화(virtualization)를 고려합니다.
- 이미지는 적절한 크기와 형식으로 최적화합니다.

## 코드 리뷰 체크리스트

코드 리뷰 시 다음 사항을 확인합니다:

- [ ] TypeScript 타입이 명시적으로 정의되어 있는가?
- [ ] 절대 경로(`@/`)를 사용하고 있는가?
- [ ] 컴포넌트가 화살표 함수로 작성되었는가?
- [ ] 접근성 속성이 적절히 추가되었는가?
- [ ] 에러 처리가 적절히 구현되었는가?
- [ ] 불필요한 콘솔 로그가 없는가?
- [ ] ESLint와 Prettier 규칙을 준수하는가?
