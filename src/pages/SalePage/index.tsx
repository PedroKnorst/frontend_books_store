import BookCard from '#/components/atoms/BookCard';
import Button from '#/components/atoms/Button';
import Input from '#/components/atoms/Input';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import { useCartContext } from '#/context/cartContext/useCartContext';
import useFormControlValidation from '#/hooks/useFormControlValidation';
import { createSale } from '#/services/sale';
import Container from '#/templates/Container';
import { inputMasks } from '#/utils/inputMasks';
import { saleValidationSchema } from './validationSchema';

const SalePage = () => {
  const { handleSubmit, inputUseFormHandler } = useFormControlValidation({ validationSchema: saleValidationSchema });

  const { user } = useAuthContext();

  const { cart } = useCartContext();

  const onSubmit = async () => {
    if (user.Client?.paymentId) {
      await createSale({ paymentId: user.Client?.paymentId })
        .then((res) => {
          console.log({ res });

          console.log('sucesso e alegria, compra realizada');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <div className="bg-yellow-500 text-black p-10 mt-4 rounded-lg">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h2>Informe seu endereço de entrega</h2>
            <h3>Custo do frete: R$30,00</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              className="bg-yellow-500 text-white border-b-white"
              label="Estado"
              {...inputUseFormHandler('state')}
            />
            <Input
              className="bg-yellow-500 text-white border-b-white"
              label="Cidade"
              {...inputUseFormHandler('city')}
            />
            <Input className="bg-yellow-500 text-white border-b-white" label="CEP" {...inputUseFormHandler('cep')} />
            <Input className="bg-yellow-500 text-white border-b-white" label="Rua" {...inputUseFormHandler('street')} />
            <Input
              className="bg-yellow-500 text-white border-b-white"
              label="Bairro"
              {...inputUseFormHandler('neighborhood')}
            />
            <Input
              className="bg-yellow-500 text-white border-b-white"
              label="Número"
              {...inputUseFormHandler('streetNumber')}
            />
          </div>

          <h2>Informe os dados do seu cartão de crédito</h2>

          <div className="grid grid-cols-2 gap-2">
            <Input
              className="bg-yellow-500 text-white border-b-white"
              label="Número do cartão"
              {...inputUseFormHandler('cardNumber')}
            />
            <Input className="bg-yellow-500 text-white border-b-white" label="CVC" {...inputUseFormHandler('cvc')} />
            <Input
              className="bg-yellow-500 text-white border-b-white"
              label="Validade"
              {...inputUseFormHandler('validity')}
            />
          </div>

          <h3>Livros a adquirir</h3>

          <div className="grid grid-cols-3 gap-2">
            {cart?.BooksCart?.map((bookCart) => <BookCard {...bookCart.Book} />)}
          </div>

          <p className="text-center text-[16pt] mt-4">Valor total: {inputMasks(cart?.totalPrice + 30, 'MONEY')}</p>
          <Button className="w-[350px] self-center">Confirmar compra</Button>
        </form>
      </div>
    </Container>
  );
};

export default SalePage;
