# Dockerfile
# 1. Node.js의 공식 이미지를 기반으로 합니다.
FROM node:18

# 2. 작업 디렉터리를 설정합니다.
WORKDIR /app

# 3. package.json과 package-lock.json을 복사하여 의존성을 설치합니다.
COPY package*.json ./

RUN npm install

# 4. 애플리케이션 코드를 복사합니다.
COPY . .

# 5. Next.js를 빌드합니다.
RUN npm run build

# 6. 애플리케이션을 실행합니다.
CMD ["npm", "start"]

# 7. Cloud Run의 기본 포트인 8080을 노출합니다.
EXPOSE 8080
