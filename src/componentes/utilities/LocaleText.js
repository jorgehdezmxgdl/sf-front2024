export const LocaleText = {
    // Root
    noRowsLabel: 'No hay datos',
    noResultsOverlayLabel: 'No se encontraron resultados.',
    errorOverlayDefaultLabel: 'Ha ocurrido un error.',
  
    // Density selector toolbar button text
    toolbarDensity: 'Densidad',
    toolbarDensityLabel: 'Densidad',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Estándar',
    toolbarDensityComfortable: 'Cómodo',
  
    // Columns selector toolbar button text
    toolbarColumns: 'Columnas',
    toolbarColumnsLabel: 'Selecciona columnas',
  
    // Filters toolbar button text
    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Mostrar filtros',
    toolbarFiltersTooltipHide: 'Ocultar filtros',
    toolbarFiltersTooltipShow: 'Mostrar filtros',
    toolbarFiltersTooltipActive: (count) => `${count} filtro(s) activo(s)`,
  
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Buscar…',
    toolbarQuickFilterLabel: 'Buscar',
    toolbarQuickFilterDeleteIconLabel: 'Borrar',
  
    // Export selector toolbar button text
    toolbarExport: 'Exportar',
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: 'Descargar como CSV',
    toolbarExportPrint: 'Imprimir',
    toolbarExportExcel: 'Descargar como Excel',
  
    // Columns panel text
    columnsPanelTextFieldLabel: 'Buscar columna',
    columnsPanelTextFieldPlaceholder: 'Título de columna',
    columnsPanelDragIconLabel: 'Reordenar columna',
    columnsPanelShowAllButton: 'Mostrar todas',
    columnsPanelHideAllButton: 'Ocultar todas',
  
    // Filter panel text
    filterPanelAddFilter: 'Añadir filtro',
    filterPanelDeleteIconLabel: 'Borrar',
    filterPanelLinkOperator: 'Operador lógico',
    filterPanelOperators: 'Operadores',
  
    // Operators text
    filterOperatorContains: 'contiene',
    filterOperatorEquals: 'es igual a',
    filterOperatorStartsWith: 'empieza con',
    filterOperatorEndsWith: 'termina con',
    filterOperatorIs: 'es',
    filterOperatorNot: 'no es',
    filterOperatorAfter: 'es posterior',
    filterOperatorOnOrAfter: 'es en o después de',
    filterOperatorBefore: 'es anterior',
    filterOperatorOnOrBefore: 'es en o antes de',
    filterOperatorIsEmpty: 'está vacío',
    filterOperatorIsNotEmpty: 'no está vacío',
    filterOperatorIsAnyOf: 'es cualquiera de',
  
    // Filter values text
    filterValueAny: 'cualquiera',
    filterValueTrue: 'verdadero',
    filterValueFalse: 'falso',
  
    // Column menu text
    columnMenuLabel: 'Menú',
    columnMenuShowColumns: 'Mostrar columnas',
    columnMenuFilter: 'Filtrar',
    columnMenuHideColumn: 'Ocultar',
    columnMenuUnsort: 'Desordenar',
    columnMenuSortAsc: 'Ordenar ASC',
    columnMenuSortDesc: 'Ordenar DESC',
  
    // Column header text
    columnHeaderFiltersTooltipActive: (count) => `${count} filtro(s) activo(s)`,
    columnHeaderFiltersLabel: 'Mostrar filtros',
    columnHeaderSortIconLabel: 'Ordenar',
  
    // Rows selected footer text
    footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
  
    // Total rows footer text
    footerTotalRows: 'Filas Totales:',
  
    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
      `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
  
    // Checkbox selection text
    checkboxSelectionHeaderName: 'Selección',
    checkboxSelectionSelectAllRows: 'Seleccionar todas las filas',
    checkboxSelectionUnselectAllRows: 'Deseleccionar todas las filas',
    checkboxSelectionSelectRow: 'Seleccionar fila',
    checkboxSelectionUnselectRow: 'Deseleccionar fila',
  
    // Boolean cell text
    booleanCellTrueLabel: 'sí',
    booleanCellFalseLabel: 'no',
  
    // Actions cell more text
    actionsCellMore: 'más',
  
    // Pinning column text
    pinToLeft: 'Anclar a la izquierda',
    pinToRight: 'Anclar a la derecha',
    unpin: 'Desanclar',
  
    // Tree Data
    treeDataGroupingHeaderName: 'Grupo',
    treeDataExpand: 'ver hijos',
    treeDataCollapse: 'ocultar hijos',
  
    // Grouping columns
    groupingColumnHeaderName: 'Agrupar',
    groupColumn: (name) => `Agrupar por ${name}`,
    unGroupColumn: (name) => `Dejar de agrupar por ${name}`,
  
    // Master/detail
    detailPanelToggle: 'Alternar panel de detalles',
    expandDetailPanel: 'Expandir',
    collapseDetailPanel: 'Contraer',
  
    // Used core components translation keys
    MuiTablePagination: {},
  
    // Row reordering text
    rowReorderingHeaderName: 'Reordenamiento de filas',
  
    // Aggregation
    aggregationMenuItemHeader: 'Agrupación',
    aggregationFunctionLabelSum: 'suma',
    aggregationFunctionLabelAvg: 'prom',
    aggregationFunctionLabelMin: 'mín',
    aggregationFunctionLabelMax: 'máx',
    aggregationFunctionLabelSize: 'tamaño',
  };