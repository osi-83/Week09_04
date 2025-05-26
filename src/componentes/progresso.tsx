import './style/progresso.css';

interface ProgressoProps {
    total: number;
    concluidas: number;
}

const Progresso: React.FC<ProgressoProps> = ({ total, concluidas }) => {
    const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    return (
        <div className="progresso">
            <h3>Progresso</h3>
            
            <div className="barra-container">
                <div className="barra-preenchida" style={{ width: `${progresso}%` }}>
                </div>
                
                <p>{progresso}% concluidas</p>
            
            </div>
        </div>
    );
};

export default Progresso;