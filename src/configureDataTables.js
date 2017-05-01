import $ from 'jquery'

export default function () {
  $.extend(true, $.fn.dataTable.defaults, {
    // dom: `
    //     <'row'<'col-sm-6 dataTables-add-action'><'col-sm-6 dataTables-length-filter'lf>>
    //     <'row'<'col-sm-12'tr>>
    //     <'row'<'col-sm-5'i><'col-sm-7'p>>
    // `,
    renderer: 'bootstrap',
    language: {
    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "_MENU_ resultados por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
    },
    "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
    }
}
  })
}
