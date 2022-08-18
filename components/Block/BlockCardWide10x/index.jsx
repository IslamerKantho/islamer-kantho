import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import CardFullWide from "../../card/CardFullWide";
import SectionWidget from "../../SectionWidget";

const BlockCardWide10x = ({ className, title, postData, ...rest }) => {
	return (
		<SectionWidget className="ik_recent__articles" title="সাম্প্রতিক লেখাসমুহ">
			<Grid container spacing={2}>
				{postData &&
					postData.map((post, i) => (
						<Grid item key={i} xs={12} md={12}>
							<CardFullWide key={post._id} postData={post} />
						</Grid>
					))}
			</Grid>
		</SectionWidget>
	);
};

BlockCardWide10x.propTypes = {
	postData: PropTypes.array.isRequired,
};

export default BlockCardWide10x;
