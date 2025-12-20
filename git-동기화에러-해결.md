# Git Sync Error (Divergent Branches) 해결 명령어

Git에서 `Sync Changes` 클릭 시 에러가 나거나, "divergent branches"(갈라진 브랜치) 메시지가 뜰 때 사용하는 명령어 모음입니다.

## 1. 가장 안전한 방법 (Merge)
로컬(내 컴퓨터) 변경 사항과 서버의 변경 사항을 시간 순서대로 합칩니다.
가장 일반적이고 안전한 방법입니다.

```bash
# 1. 설정: 앞으로 이런 상황이면 무조건 'Merge(병합)' 하도록 설정
git config pull.rebase false

# 2. 실행: 서버 내용 받아와서 합치기
git pull
```

## 2. 깔끔한 이력을 원할 때 (Rebase)
내 변경 사항을 잠시 떼어내고, 서버의 최신 내용을 먼저 받은 뒤, 그 위에 내 변경 사항을 다시 붙입니다.
커밋 그래프가 한 줄로 깔끔해지지만, 충돌 발생 시 해결이 조금 더 복잡할 수 있습니다.

```bash
# 1. 설정: 앞으로 이런 상황이면 무조건 'Rebase(재배치)' 하도록 설정
git config pull.rebase true

# 2. 실행: 서버 내용 받아와서 재배치
git pull
```

## 3. 내 거 다 무시하고 서버 내용으로 덮어쓰기 (무서운 명령어)
**주의:** 내 컴퓨터에서 아직 올리지 않은 작업 내용이 전부 삭제됩니다.

```bash
# 서버(origin)의 main 브랜치 내용으로 강제 초기화
git fetch --all
git reset --hard origin/main
```

## 4. 자주 쓰는 Git 상태 확인 명령어

```bash
# 현재 상태 확인 (어떤 파일이 바뀌었는지)
git status

# 변경된 파일 목록 심플하게 보기
git status -s
```
