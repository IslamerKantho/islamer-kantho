import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const SectionWidget = ({ className, title, children, ...rest }) => {
	return (
		<Box className={`ik_c_section ${className ? className : ""}`} {...rest}>
			{title && (
				<Box className="ik_section__head">
					<Container className="ik_section__head_container" maxWidth="lg">
						<Typography
							className="ik_section__head__title"
							variant="h4"
							component="h4">
							{title}
						</Typography>
					</Container>
				</Box>
			)}

			<Box className="ik_section__body">
				<Container className="ik_section__body__container" maxWidth="lg">
					{children}
				</Container>
			</Box>
		</Box>
	);
};

SectionWidget.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.node,
	rest: PropTypes.object,
};

export default SectionWidget;
