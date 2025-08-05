interface FormErrorsProps {
  error: { message: string } | undefined;
}

const FormErrors = ({ error }: FormErrorsProps) => {
  return (
    <>
      {error && (
        <p className="mb-0 text-[0.8rem] text-red-600 dark:text-red-400 text-end">
          {error.message}
        </p>
      )}
    </>
  );
};

export default FormErrors;
