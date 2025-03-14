interface TonesComponentProps {
  title: string;
}

export const TonesComponent: React.FC<TonesComponentProps> = ({ title }) => {
  return (
    <div className="home">
      {title}
      <div></div>
    </div>
  );
};
