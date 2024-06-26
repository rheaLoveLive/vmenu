const NumberInput = ({ value, counter, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="join">
        <div className="indicator">
          <button
            onClick={() => counter("minus")}
            className="btn join-item h-[30px] min-h-[30px]">
            <i className="pi pi-minus"></i>
          </button>
        </div>
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="input h-[30px] w-2 join-item text-black"
        />
        <div className="indicator">
          <button
            onClick={() => counter("plus")}
            className="btn h-[30px] min-h-[30px] join-item">
            <i className="pi pi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
