import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface CommentResponse {
  id?: number;
  task_id?: number;
  text?: string;
  error?: string;
  message?: string;
}

const CommentForm: React.FC = () => {
  const [taskId, setTaskId] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<CommentResponse | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/comments', {
  task_id: parseInt(taskId),
  author: "chahak",
  content: text,
       });
      setResponse(res.data);
    } catch (error: any) {
      setResponse(error.response?.data || { error: 'Something went wrong' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Post a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task ID:</label>
          <input
            type="number"
            value={taskId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <pre style={{ background: '#f6f6f6', padding: '1em' }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default CommentForm;
