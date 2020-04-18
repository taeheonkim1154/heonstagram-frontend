// 로그인 상태 변경하는 파일

export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
    Mutation: {
        // 토큰이 있으면 로그인했다는 얘기니까, cache함과 동시에, isLoggedIn을 true로 바꿈
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location = "/";
            return null;
        }
    }
};