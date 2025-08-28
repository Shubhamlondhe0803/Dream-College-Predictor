
function StudentImage() {
  return (
    <motion.img
      src="/student-img.png"
      alt="Student"
      className="w-40 h-40 rounded-full shadow-md border-4 border-purple-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    />
  );
}

export default StudentImage;
