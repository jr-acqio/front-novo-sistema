import $ from 'jquery'

export default function () {
  $.extend(true, $.fn.dataTable.defaults, {
    renderer: 'bootstrap',
    dom: 'lBfrtip',
    colReorder: true,
    responsive: true,
    buttons: [
      {
        extend: 'csv',
        text: 'CSV',
        // title: 'Dados',
        exportOptions: {
            modifier: {
                search: 'none'
            }
        }
      },
      'excel', 'pdf',
      {
        extend: 'print',
        text: 'Imprimir'
      },
      {
        extend: 'copy',
        text: 'Copiar'
      },
      'colvis'
    ],
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
      },
      buttons: {
        colvis: 'Selecionar Colunas',

        copyTitle: 'Copiado para a àrea de transferência' + '<br>Aperte CTRL + V e cole onde desejar',
        copySuccess: {
            _: '%d linhas copiadas',
            1: '1 linha copiada'
        }
      }
    }
  })
}
