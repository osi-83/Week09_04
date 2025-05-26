import { useState } from 'react';
import type { Tarefa } from './tarefas';

interface NovaTarefaProps {
  onAdicionarTarefa: (tarefa: Tarefa) => void;
}

const NovaTarefa: React.FC<NovaTarefaProps> = ({ onAdicionarTarefa }) => {
  const [descricao, setDescricao] = useState('');
  const [periodo, setPeriodo] = useState('Manhã');

  const handleSubmit = () => {
    if (descricao.trim() === '') return;
    onAdicionarTarefa({ descricao, periodo });
    setDescricao('');
  };

  return (
    <div className="nova-tarefa">
      <input
        type="text"
        placeholder="Nova tarefa"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Noite">Noite</option>
      </select>
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
};

export default NovaTarefa;