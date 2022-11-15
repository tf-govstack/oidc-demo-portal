const Error = ({ errorCode, errorMsg }) => {
  return (
    <div
      className="p-4 w-full mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      {errorCode && <p class="text-center">ErrorCode: {errorCode}</p>}
      {errorMsg && <p class="text-center">ErrorMsg: {errorMsg}</p>}
    </div>
  );
};

export { Error };
