"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const whatsappNumber = "50672462292";

    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menu-button");
    const mainMenu = document.getElementById("main-menu");
    const menuLinks = document.querySelectorAll(".main-menu a");
    const whatsappLinks = document.querySelectorAll(".whatsapp-link");
    const quoteForm = document.getElementById("quote-form");
    const currentYear = document.getElementById("current-year");

    const testimonials = Array.from(
        document.querySelectorAll(".testimonial")
    );

    const testimonialDots = Array.from(
        document.querySelectorAll("#testimonial-dots button")
    );

    const testimonialPreviousButton = document.getElementById(
        "testimonial-prev"
    );

    const testimonialNextButton = document.getElementById(
        "testimonial-next"
    );

    const faqItems = document.querySelectorAll(".faq-item");
    const revealElements = document.querySelectorAll(".reveal");

    let currentTestimonial = 0;
    let testimonialInterval = null;

    const buildWhatsappUrl = (message) => {
        const encodedMessage = encodeURIComponent(message);

        return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    };

    const openWhatsapp = (message) => {
        const url = buildWhatsappUrl(message);

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const closeMenu = () => {
        if (!mainMenu || !menuButton) {
            return;
        }

        mainMenu.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
        if (!mainMenu || !menuButton) {
            return;
        }

        mainMenu.classList.add("open");
        menuButton.classList.add("active");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Cerrar menú");
        document.body.classList.add("menu-open");
    };

    const toggleMenu = () => {
        if (!mainMenu) {
            return;
        }

        const menuIsOpen = mainMenu.classList.contains("open");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const updateHeader = () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    const showTestimonial = (index) => {
        if (testimonials.length === 0) {
            return;
        }

        if (index < 0) {
            currentTestimonial = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            currentTestimonial = 0;
        } else {
            currentTestimonial = index;
        }

        testimonials.forEach((testimonial, testimonialIndex) => {
            const isCurrent = testimonialIndex === currentTestimonial;

            testimonial.classList.toggle("active", isCurrent);
            testimonial.setAttribute(
                "aria-hidden",
                String(!isCurrent)
            );
        });

        testimonialDots.forEach((dot, dotIndex) => {
            const isCurrent = dotIndex === currentTestimonial;

            dot.classList.toggle("active", isCurrent);

            dot.setAttribute(
                "aria-current",
                isCurrent ? "true" : "false"
            );
        });
    };

    const nextTestimonial = () => {
        showTestimonial(currentTestimonial + 1);
    };

    const previousTestimonial = () => {
        showTestimonial(currentTestimonial - 1);
    };

    const stopTestimonialAutoplay = () => {
        if (testimonialInterval !== null) {
            window.clearInterval(testimonialInterval);
            testimonialInterval = null;
        }
    };

    const startTestimonialAutoplay = () => {
        stopTestimonialAutoplay();

        if (testimonials.length <= 1) {
            return;
        }

        testimonialInterval = window.setInterval(
            nextTestimonial,
            6500
        );
    };

    const restartTestimonialAutoplay = () => {
        stopTestimonialAutoplay();
        startTestimonialAutoplay();
    };

    const updateOpenFaqHeight = () => {
        const openFaqItem = document.querySelector(".faq-item.open");

        if (!openFaqItem) {
            return;
        }

        const answer = openFaqItem.querySelector(".faq-item__answer");

        if (!answer) {
            return;
        }

        answer.style.maxHeight = `${answer.scrollHeight}px`;
    };

    if (currentYear) {
        currentYear.textContent = String(
            new Date().getFullYear()
        );
    }

    if (menuButton) {
        menuButton.addEventListener(
            "click",
            toggleMenu
        );
    }

    menuLinks.forEach((link) => {
        link.addEventListener(
            "click",
            closeMenu
        );
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 960) {
                closeMenu();
            }

            updateOpenFaqHeight();
        }
    );

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

    updateHeader();

    whatsappLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const service =
                link.dataset.service ||
                "los servicios de Menstruando Ando";

            const message = [
                "Hola, Menstruando Ando.",
                "",
                `Me gustaría recibir información y cotizar ${service}.`,
                "",
                "Quedo atento(a) a la información sobre disponibilidad, modalidad y precio."
            ].join("\n");

            openWhatsapp(message);
        });
    });

    if (quoteForm) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombreInput = document.getElementById("nombre");
            const organizacionInput =
                document.getElementById("organizacion");
            const servicioInput =
                document.getElementById("servicio");
            const modalidadInput =
                document.getElementById("modalidad");
            const participantesInput =
                document.getElementById("participantes");
            const ubicacionInput =
                document.getElementById("ubicacion");
            const mensajeInput =
                document.getElementById("mensaje");
            const aceptacionInput =
                document.getElementById("aceptacion");

            const nombre = nombreInput
                ? nombreInput.value.trim()
                : "";

            const organizacion = organizacionInput
                ? organizacionInput.value.trim()
                : "";

            const servicio = servicioInput
                ? servicioInput.value
                : "";

            const modalidad = modalidadInput
                ? modalidadInput.value
                : "";

            const participantes = participantesInput
                ? participantesInput.value.trim()
                : "";

            const ubicacion = ubicacionInput
                ? ubicacionInput.value.trim()
                : "";

            const informacionAdicional = mensajeInput
                ? mensajeInput.value.trim()
                : "";

            const aceptado = aceptacionInput
                ? aceptacionInput.checked
                : false;

            if (
                !nombre ||
                !servicio ||
                !modalidad ||
                !participantes ||
                !ubicacion
            ) {
                window.alert(
                    "Por favor, completa todos los campos obligatorios."
                );

                return;
            }

            if (!aceptado) {
                window.alert(
                    "Debes aceptar el envío de la información mediante WhatsApp."
                );

                return;
            }

            const organizationLine = organizacion
                ? `Familia u organización: ${organizacion}`
                : "Familia u organización: No especificada";

            const additionalInformationLine =
                informacionAdicional
                    ? informacionAdicional
                    : "No se agregó información adicional.";

            const message = [
                "Hola, Menstruando Ando.",
                "",
                "Me gustaría solicitar una cotización.",
                "",
                `Nombre: ${nombre}`,
                organizationLine,
                `Servicio: ${servicio}`,
                `Modalidad: ${modalidad}`,
                `Cantidad aproximada de participantes: ${participantes}`,
                `Ubicación: ${ubicacion}`,
                "",
                "Información adicional:",
                additionalInformationLine,
                "",
                "Quedo atento(a) a la disponibilidad y precio. Muchas gracias."
            ].join("\n");

            openWhatsapp(message);
        });
    }

    faqItems.forEach((item) => {
        const button = item.querySelector("button");
        const answer = item.querySelector(
            ".faq-item__answer"
        );

        if (!button || !answer) {
            return;
        }

        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            faqItems.forEach((otherItem) => {
                const otherButton =
                    otherItem.querySelector("button");

                const otherAnswer =
                    otherItem.querySelector(
                        ".faq-item__answer"
                    );

                otherItem.classList.remove("open");

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                item.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;
            }
        });
    });

    if (testimonialPreviousButton) {
        testimonialPreviousButton.addEventListener(
            "click",
            () => {
                previousTestimonial();
                restartTestimonialAutoplay();
            }
        );
    }

    if (testimonialNextButton) {
        testimonialNextButton.addEventListener(
            "click",
            () => {
                nextTestimonial();
                restartTestimonialAutoplay();
            }
        );
    }

    testimonialDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = Number(
                dot.dataset.index
            );

            if (Number.isNaN(index)) {
                return;
            }

            showTestimonial(index);
            restartTestimonialAutoplay();
        });
    });

    showTestimonial(0);
    startTestimonialAutoplay();

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stopTestimonialAutoplay();
            } else {
                startTestimonialAutoplay();
            }
        }
    );

    if ("IntersectionObserver" in window) {
        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});