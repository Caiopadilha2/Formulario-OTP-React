import cadeado from './assets/cadeado.svg'
import OtpForm from './components/OtpForm.tsx'

function App() {
  return (
    <main className='bg-stone-400 min-h-screen py-48'>
      <section className='bg-white mx-auto max-w-96 rounded-3xl text-center p-8'>
        <div className='h-16 w-16 bg-blue-300 rounded-full mx-auto flex items-center justify-center'>
          <img src={cadeado} alt="" className='w-7'/>
        </div>
        <h1 className='mt-5 text-3xl font-bold text-stone-700'>Preencha o Código</h1>
        <p className='mt-1 text-sm text-stone-400'>Enviamos um código SMS para o telefone cadastrado</p>
      <OtpForm />
      </section>
    </main>
      
  )
}

export default App
