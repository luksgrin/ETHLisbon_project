export default function QuestionCard({}: {}) {
  return (
    <>
      <div className="Card">
        <div className="Card__Header">
          <div className="WrapperImage">
            <img className="AvatarImage" src="avatar" alt="avatar"></img>
          </div>
          Question default title
        </div>
        <div className="Card__Content">
          <div className="Card__Text">
            <input
              className="Card__Textarea"
              placeholder="Solve this question"
            />
          </div>
          <div className="Card__Footer">
            <div>UserName</div>
            <div>Text about the time</div>
            <button>Donate</button>
            <button>Solve</button>
          </div>
        </div>
      </div>
    </>
  );
}
