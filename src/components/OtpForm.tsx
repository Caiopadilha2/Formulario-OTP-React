import { useEffect, useRef, useState } from "react"

type OtpType = [string, string, string, string, string]
export default function OtpForm() {

  const firstInputRef = useRef<HTMLInputElement>(null)
  const [otp, setOtp] = useState<OtpType>(['', '', '', '', ''])
  
  // UseEffect para trazer o foco para o primeiro input
  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    const value = event.currentTarget.value
    const name = event.currentTarget.name
    // console.log(event.currentTarget.nextElementSibling)
    const nextInput = event.currentTarget.nextElementSibling as HTMLInputElement | null

    const index = Number(name.split('-')[1])
    // console.log(index)
    // console.log(value)
    
    // nao aceitar letras nos inputs, somente numeros
    if (!/^\d*$/.test(value)) {
      return 
    }

    setOtp((prevOtp) => {
      const newOtp: OtpType = [...prevOtp]
      newOtp[index] = value
      return newOtp
    })
    // Mudar o foco para o próximo input após digitar
    if (value && nextInput) {
      nextInput.focus()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const previousInput = event.currentTarget.previousElementSibling as HTMLInputElement | null
    // console.log(previousInput)
    const nextInput = event.currentTarget.nextElementSibling as HTMLInputElement | null
    
    if (previousInput && event.key === 'Backspace' && !event.currentTarget.value) {
      previousInput.focus()
    }

    if (event.key === 'ArrowRight') {
      if (nextInput) {
        nextInput.focus()
      }
    }

    if (event.key === 'ArrowLeft') {
      if (previousInput) {
        previousInput.focus()
      }
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const clipboardData = event.clipboardData?.getData('text') || ''
    const otpArray = clipboardData.split('').filter((el) => /^\d*$/.test(el)).slice(0, 5)
    
    if (otpArray.length !== 5) {
      alert('Você colou um código com formato inválido.')
      return
    }
    setOtp(otpArray as OtpType)
  }

  return (
    <form className="mt-10">
      <div className="flex items-center justify-center gap-3">
        <input
          inputMode="numeric"
          autoComplete="one-time-code" 
          ref={firstInputRef}
          required
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          maxLength={1}
          value={otp[0]}
          name="otp-0"
          type="text"
          className="w-10 p-2 bg-stone-200 text-stone-800 rounded-lg text-3xl text-center"
        />
        <input
          inputMode="numeric"
          autoComplete="one-time-code" 
          maxLength={1}
          required
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={otp[1]}
          name="otp-1"
          type="text"
          className="w-10 p-2 bg-stone-200 text-stone-800 rounded-lg text-3xl text-center"
        />
        <input
          inputMode="numeric"
          autoComplete="one-time-code" 
          maxLength={1}
          required
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={otp[2]}
          name="otp-2"
          type="text"
          className="w-10 p-2 bg-stone-200 text-stone-800 rounded-lg text-3xl text-center"
        />
        <input
          inputMode="numeric"
          autoComplete="one-time-code" 
          maxLength={1}
          required
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={otp[3]}
          name="otp-3"
          type="text"
          className="w-10 p-2 bg-stone-200 text-stone-800 rounded-lg text-3xl text-center"
        />
        <input
          autoComplete="one-time-code" 
          inputMode="numeric"
          maxLength={1}
          required
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={otp[4]}
          name="otp-4"
          type="text"
          className="w-10 p-2 bg-stone-200 text-stone-800 rounded-lg text-3xl text-center"
        />
      </div>
      <button className="bg-blue-300 block px-12 py-3 rounded-full text-white font-bold text-xl mx-auto mt-10" type="submit">
        Verificar OTP
      </button>
    </form>
  )
}
