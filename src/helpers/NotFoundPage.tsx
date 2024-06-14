import Container from '#/templates/Container';

const NotFoundPage = () => {
  return (
    <Container>
      <div className="bg-yellow-500 text-black text-center p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <h1>404</h1>
        <h2 className="font-[700]">Pagina não encontrada!</h2>
        <p>
          Esta perdido capitão? Parece que o que você esta procurando não existe! Mas não se preocupe, certifique de que
          você informou o caminho correto e tente novamente!
        </p>
      </div>
    </Container>
  );
};

export default NotFoundPage;
