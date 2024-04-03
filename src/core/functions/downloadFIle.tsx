interface headerProps {
    description?:string,
    name?:string,
}
export const downloadFunction = (file: any, header:headerProps, title?:string) => {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute(
        'download',
        `${header?.description||header?.name||title}.xlsx`,
    );

    document.body.appendChild(link);
    link.click();
    link.remove();
}