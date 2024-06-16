import { useAuthContext } from '#/context/authContext/useAuthContext';
import Container from '#/templates/Container';
import { inputMasks } from '#/utils/inputMasks';

const MySales = () => {
  const { user } = useAuthContext();

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <h2>Meu saldo: {inputMasks(user.Salesperson?.balance || 0, 'MONEY')}</h2>
      </div>
    </Container>
  );
};

export default MySales;
