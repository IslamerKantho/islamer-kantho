import clsx from "clsx";

function DottedDivider( { className } ) {
  return (
    <div className="container">
      <div
        className={ clsx( "w-full h-2 my-2 bg-repeat-x", className ) }
        style={ {
          backgroundImage:
            "radial-gradient(#044f4f 20%, transparent 0)",
          backgroundSize: "3px 3px",
          backgroundPosition: "left center",
        } }
      />
    </div>
  );
}

export default DottedDivider;
