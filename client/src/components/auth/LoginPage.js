import React from "react";
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
} from "@material-ui/core";
import validationsForm from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";

const styles = () => ({
    card: {
        maxWidth: 420,
        marginTop: 50,
    },
    container: {
        display: "Flex",
        justifyContent: "center",
    },
    actions: {
        float: "right",
    },
});

const form = (props) => {
    const {
        classes,
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email ? errors.email : ""}
                            error={touched.email && Boolean(errors.email)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password ? errors.password : ""}
                            error={touched.password && Boolean(errors.password)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            로그인
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
};

const Form = withFormik({
    mapPropsToValues: ({ email, password }) => {
        return {
            email: email || "",
            password: password || "",
        };
    },

    validationSchema: yup.object().shape(validationsForm),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            // submit to the server
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
})(form);

export default withStyles(styles)(Form);
