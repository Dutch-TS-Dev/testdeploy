import "./style.css";

export const Buttons = () => {
  return (
    <>
      <div className="button-container">
        <button
          onClick={() => {
            setActiveButtons({
              ...activeButtons,
              microphone: !activeButtons.microphone,
            });
          }}
        ></button>

        <label class="switch">
          <input type="checkbox" />
          <spa class="menu"></spa>
        </label>
      </div>
    </>
  );
};
