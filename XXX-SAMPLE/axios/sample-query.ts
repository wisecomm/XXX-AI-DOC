import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api/axiosClient';

// GET
const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users'),
});

// POST (Mutation)
const queryClient = useQueryClient();
const mutation = useMutation({
    mutationFn: (newUser) => api.post('/users', newUser),
    onSuccess: () => {
        queryClient.invalidateQueries(['users']); // 목록 자동 갱신
    },
});