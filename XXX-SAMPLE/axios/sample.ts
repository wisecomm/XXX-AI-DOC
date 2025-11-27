import { useEffect, useState } from 'react';
import { api } from './api/axiosClient'; // 위에서 만든 파일 import

function UserList() {
    const [users, setUsers] = useState([]);

    // 1. GET 예시
    const fetchUsers = async () => {
        try {
            const data = await api.get('/users'); // axios.get('/users')와 동일하지만 더 깔끔함
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    // 2. POST 예시
    const addUser = async (newUser) => {
        try {
            await api.post('/users', newUser);
            fetchUsers(); // 목록 갱신
        } catch (error) {
            alert('생성 실패!');
        }
    };

    // 3. DELETE 예시
    const deleteUser = async (id) => {
        if (window.confirm('삭제하시겠습니까?')) {
            await api.delete(`/users/${id}`);
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
        {/* UI 렌더링 */ }
        < button onClick = {() => addUser({ name: 'New User' })
}> 추가 </button>
    <ul>
{
    users.map(user => (
        <li key= { user.id } >
        { user.name }
        < button onClick = {() => deleteUser(user.id)}> 삭제 </button>
            </li>
        ))}
</ul>
    </div>
  );
}