/**
 * =========================================================
 * ANISH SIR CLASSES
 * js/main.js
 * Version: 1.0
 * =========================================================
 */

"use strict";

/**
 * =========================================================
 * APPLICATION BOOTSTRAP
 * =========================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    initializeMobileNavigation();
    initializeContactForm();
});

/**
 * =========================================================
 * MOBILE NAVIGATION
 * =========================================================
 */
function initializeMobileNavigation() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".primary-navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        navigation.classList.toggle("is-open");

        menuButton.textContent =
            isExpanded ? "Menu" : "Close";
    });

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        navigation.classList.remove("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.textContent = "Menu";
    });
}

/**
 * =========================================================
 * CONTACT FORM
 * =========================================================
 */
function initializeContactForm() {

    const form =
        document.querySelector("#contact-form");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        handleFormSubmission
    );
}

/**
 * =========================================================
 * FORM SUBMISSION
 * =========================================================
 */
function handleFormSubmission(event) {

    const form =
        event.currentTarget;

    const name =
        form.querySelector(
            'input[name="name"]'
        )?.value ?? "";

    const phone =
        form.querySelector(
            'input[name="phone"]'
        )?.value ?? "";

    const message =
        form.querySelector(
            'textarea[name="message"]'
        )?.value ?? "";

    const validationResult =
        validateForm({
            name,
            phone,
            message
        });

    if (!validationResult.isValid) {

        event.preventDefault();

        displayFormError(
            validationResult.message
        );

        return;
    }

    clearFormMessage();
}

/**
 * =========================================================
 * FORM VALIDATION
 * =========================================================
 */
function validateForm(data) {

    const name =
        data.name.trim();

    const phone =
        data.phone.trim();

    const message =
        data.message.trim();

    if (name.length < 2) {

        return {
            isValid: false,
            message:
                "Please enter a valid name."
        };
    }

    if (
        phone &&
        !isValidPhone(phone)
    ) {

        return {
            isValid: false,
            message:
                "Please enter a valid phone number."
        };
    }

    if (message.length < 5) {

        return {
            isValid: false,
            message:
                "Please enter a message."
        };
    }

    return {
        isValid: true,
        message: ""
    };
}

/**
 * =========================================================
 * PHONE VALIDATION
 * =========================================================
 */
function isValidPhone(phone) {

    const normalizedPhone =
        phone.replace(/\s+/g, "");

    const phonePattern =
        /^[+]?[0-9]{10,15}$/;

    return phonePattern.test(
        normalizedPhone
    );
}

/**
 * =========================================================
 * FORM FEEDBACK
 * =========================================================
 */
function displayFormError(message) {

    let messageContainer =
        document.querySelector(
            "#form-feedback"
        );

    if (!messageContainer) {

        messageContainer =
            document.createElement("div");

        messageContainer.id =
            "form-feedback";

        messageContainer.setAttribute(
            "role",
            "alert"
        );

        const form =
            document.querySelector(
                "#contact-form"
            );

        form?.prepend(
            messageContainer
        );
    }

    messageContainer.textContent =
        message;
}

function clearFormMessage() {

    const messageContainer =
        document.querySelector(
            "#form-feedback"
        );

    if (!messageContainer) {
        return;
    }

    messageContainer.textContent = "";
}

/**
 * =========================================================
 * FUTURE ENHANCEMENTS
 * =========================================================
 *
 * Reserved for:
 *
 * - Form submission status
 * - Analytics (if required)
 * - Accessibility enhancements
 * - FAQ interactions
 * - Course filtering
 *
 * Keep dependencies at zero unless
 * a real business requirement exists.
 */
