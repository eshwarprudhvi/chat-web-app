import AuthForm from "./components/AuthForm";
function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-8 shadow-xl rounded-2xl sm:px-10">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
