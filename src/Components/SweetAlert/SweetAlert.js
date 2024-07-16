import Swal from "sweetalert2";

export async function showConfirmationDialog(
  title,
  text,
  confirmButtonText,
  cancelButtonText
) {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });

  if (result.isConfirmed) {
    return true;
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return false;
  }

  // Handle other dismiss cases here if needed
  return false;
}

//   export function showAlert(type, message) {
//     Swal.fire({
//       icon: type,
//       title: type === 'success' ? 'Success' : 'Error',
//       text: message,
//     });
//   }
