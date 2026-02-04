export default function EmptyBox({ text }: { text: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h2 className="text-black">{text}</h2>
    </div>
  );
}
