import React, { useState } from "react"

interface FormFieldProps {
  labelName: string
  placeholder: string
  inputType: React.HTMLInputTypeAttribute | undefined
  isTextArea?: boolean
  value: string
  handleChange: (e?: any) => void
}

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}: FormFieldProps) => {
  return (
    <label htmlFor="" className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}

      {isTextArea ? (
        <textarea
          name=""
          id=""
          //   cols={30}
          rows={10}
          required
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField
