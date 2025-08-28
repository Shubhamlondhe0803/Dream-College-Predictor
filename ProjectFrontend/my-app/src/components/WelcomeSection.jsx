import StudentHistory from "./StudentHistory";

function WelcomeSection() {
  return (
    <div className="bg-purple-100 p-4 rounded-xl shadow-lg w-fit">
      <h2 className="text-2xl font-bold mb-2">Welcome, John!</h2>
      <p className="text-gray-700">Email: john@example.com</p>
      <div className="mt-4">
        <StudentHistory />
      </div>
    </div>
  );
}

export default WelcomeSection;
