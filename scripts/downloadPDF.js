export const downloadPDF = () => {
    const element = document.querySelector("main");

    const tempElement = document.createElement("div");
    tempElement.innerHTML = element.innerHTML;
    tempElement.className = element.className;
    tempElement.id = "temp-element";

    tempElement.style.width = "595px";
    tempElement.style.position = "absolute";
    tempElement.style.left = "-9999px";
    document.body.appendChild(tempElement);

    const mediaStyles = document.createElement("style");
    mediaStyles.textContent = `
    @media screen and (max-width: 594px) {
        #temp-element.main {
            width: 595px !important;
            max-width: none !important;
            padding: 5px 20px;
        }

        #temp-element .profile-img__box {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
        }
        
        #temp-element .person-info__box {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
        }
        
        #temp-element .languages__box {
            grid-column: 3 / 5;
            grid-row: 1 / 2;
        }
        
        #temp-element .experience__box {
            grid-column: 1 / 4;
            grid-row: 2 / 3;
        }
        
        #temp-element .experience__content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        
        #temp-element .experience__featured-points_list {
            max-inline-size: 227px;
        }
        
        #temp-element .tools__box {
            grid-column: 4 / 5;
            grid-row: 2 / 3;
        }
        
        #temp-element .tools__list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-inline: 12px;
        }
        
        #temp-element .tools__field_list {
            display: grid;
            grid-template-columns: repeat(2, auto);
            gap: 16px;
        }
        
        #temp-element .education__box {
            grid-column: 1 / 3;
            grid-row: 3 / 5;
            padding-inline: 8px;
        }
        
        #temp-element .education__list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(116px, 1fr));
            gap: 10px;
            align-items: start;
        }
        
        #temp-element .interests__box {
            grid-column: 3 / 5;
            grid-row: 3 / 4;
        }
        
        #temp-element .contacts__box {
            grid-column: 3 / 5;
            grid-row: 4 / 5;
        }
    }
`;
    document.head.appendChild(mediaStyles);

    html2canvas(tempElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf.jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("document.pdf");

        document.body.removeChild(tempElement);
        document.head.removeChild(mediaStyles);
    });
};
