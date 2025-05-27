import { useState } from 'react';
import './style/tarefas.css';
import NovaTarefa from './novatarefa';
import Progresso from './progresso';

export interface Tarefa {
  descricao: string;
  periodo: string;
  concluida?: boolean;
}

const Tarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionarTarefa = (tarefa: { descricao: string; periodo: string }) => {
    setTarefas((prev) => [
      ...prev,
      { ...tarefa, concluida: false },
    ]);
  };

  const alternarConclusao = (index: number) => {
    setTarefas((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, concluida: !t.concluida } : t
      )
    );
  };

  const tarefasPorPeriodo = (periodo: string) =>
    tarefas.filter((t) => t.periodo === periodo);

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;

  return (
    <div className="tarefas">
      <h2><em>Lista de tarefas</em></h2>
      <NovaTarefa onAdicionarTarefa={adicionarTarefa} />

      <Progresso total={tarefas.length} concluidas={totalConcluidas} />

      <p><strong>Total de tarefas concluidas: {totalConcluidas}</strong></p>

      <div className="colunas">
        {['Manhã', 'Tarde', 'Noite'].map((periodo) => (
          <div className="coluna" key={periodo}>
            <h3>{periodo}</h3>
            <ul>
              {tarefasPorPeriodo(periodo).map((tarefa) => {
                const indexReal = tarefas.findIndex(
                  (t) => t.descricao === tarefa.descricao && t.periodo === tarefa.periodo
                );
                return (
                  <li key={indexReal}>
                    <label style={{
                      textDecoration: tarefa.concluida ? 'line-through' : 'none',
                      color: tarefa.concluida ? '#aaa' : '#000',
                    }}>
                      <input
                        type="checkbox"
                        checked={tarefa.concluida}
                        onChange={() => alternarConclusao(indexReal)}
                        style={{ marginRight: '8px' }}
                      />
                      {tarefa.descricao}
                    </label>
                  </li>
                );
              })}
            </ul>
            <p>
              Concluidas: {tarefasPorPeriodo(periodo).filter((t) => t.concluida).length
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tarefas;