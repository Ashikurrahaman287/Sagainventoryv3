!macro customInstall
  ; Register saga:// protocol
  DeleteRegKey HKCR "saga"
  WriteRegStr HKCR "saga" "" "URL:Saga Inventory Protocol"
  WriteRegStr HKCR "saga" "URL Protocol" ""
  WriteRegStr HKCR "saga\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "saga\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
  
  ; Register .inv file association
  WriteRegStr HKCR ".inv" "" "SagaInventory.Document"
  WriteRegStr HKCR "SagaInventory.Document" "" "Saga Inventory Data File"
  WriteRegStr HKCR "SagaInventory.Document\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME},0"
  WriteRegStr HKCR "SagaInventory.Document\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
!macroend

!macro customUninstall
  ; Remove protocol handler
  DeleteRegKey HKCR "saga"
  
  ; Remove file associations
  DeleteRegKey HKCR ".inv"
  DeleteRegKey HKCR "SagaInventory.Document"
!macroend